from locust import HttpUser, between, task
import random

with open("users.txt") as f:
	emails = [line.strip() for line in f if line.strip()]

class ZuckerbookUser(HttpUser):
	host = "http://localhost:3000"
	wait_time = between(5, 55)
	timeout = 10

	def on_start(self):
		headers = {
    	"Accept": "application/json",
      "Content-Type": "application/json"
    }
		response = self.client.post("/api/auth/sign_in", json={
      "user": {
				"email": random.choice(emails),
				"password": "000000"
			}
		}, headers=headers)
		try:
			response_data = response.json()
			if response_data.get("data") and response_data["data"].get("token"):
				self.access_token = response_data["data"]["token"]
				print(f"Access token: {self.access_token}")
			else:
				print("Failed to get access token from response")
				self.access_token = None
		except Exception as e:
			if response.status_code == 0:
				print("Request timeout")
			else:
				print(f"Error: {e}")
				print(f"Response: {response.status_code}")
			self.access_token = None
		finally:
			print(f"Access token: {self.access_token}")

	@task
	def list_post(self):
		if not self.access_token:
			print("No access token available, skipping request")
			return
		headers = {
			"Authorization": f"Bearer {self.access_token}",
			"Accept": "application/json",
			"Content-Type": "application/json"
		}
		self.client.get("/api/v1/posts", headers=headers)

	@task
	def post_message(self):
		if not self.access_token:
			print("No access token available, skipping request")
			return
		headers = {
      "Authorization": f"Bearer {self.access_token}",
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
		self.client.post("/api/v1/messages", json={
      "content": "Greetings from locust"
    }, headers=headers)
