import axios from "axios"

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
		Accept: "application/json"
  },
  timeout: 10000,
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
			// TODO: redirect to sign in page
      localStorage.removeItem("accessToken")
      localStorage.removeItem("currentUser")
    }
    return Promise.reject(error)
  }
)

function flattenJsonApiResponse(json) {
	if (!json) {
		return null
	}
	const { data, included } = json
	if (!data) {
		return json
	}

  const includedMap = {}
	if (included) {
		for (const item of included) {
			includedMap[`${item.type}:${item.id}`] = item
		}
	}

  const flattenItem = (item) => {
    const flat = { id: item.id, ...item.attributes }

    if (!item.relationships) {
			return flat
		}
		for (const [key, rel] of Object.entries(item.relationships)) {
			if (Array.isArray(rel.data)) { // has many
				flat[key] = rel.data.map(relItem => {
					const includedItem = includedMap[`${relItem.type}:${relItem.id}`]
					if (includedItem) {
						return flattenItem(includedItem)
					}
					return relItem
				})
			} else if (rel.data) { // has one
				const includedItem = includedMap[`${rel.data.type}:${rel.data.id}`]
				flat[key] = includedItem ? flattenItem(includedItem) : rel.data
			} else {
				flat[key] = null
			}
		}
		return flat
  }

  if (!Array.isArray(data)) {
		return flattenItem(data)
	}
  return data.map(flattenItem)
}

export const AuthAPI = {
	signIn: async (data) => {
		const response = await api.post("/auth/sign_in", data)
		return response.data.data
	},
	signUp: async (data) => {
		const response = await api.post("/auth/sign_up", data)
		return response.data.data
	},
	signOut: async () => {
		const response = await api.delete("/auth/sign_out")
		return response.data.message
	}
}

export const PostsAPI = {
  list: async (params = {}) => {
    const response = await api.get('/v1/posts', { params })
    return flattenJsonApiResponse(response.data)
  },
  get: async (id) => {
    const response = await api.get(`/v1/posts/${id}`)
    return flattenJsonApiResponse(response.data)
  },
  create: async (postData) => {
    const response = await api.post('/v1/posts', {
      data: {
        type: "post",
        attributes: postData
      }
    })
    return flattenJsonApiResponse(response.data)
  },
  update: async (id, postData) => {
    const response = await api.put(`/v1/posts/${id}`, {
      data: {
        id,
        type: "post",
        attributes: postData
      }
    })
    return flattenJsonApiResponse(response.data)
  },
  delete: async (id) => {
    return await api.delete(`/v1/posts/${id}`)
  },
  like: async (id) => {
    return await api.patch(`/v1/posts/${id}/like`)
  }
}

export const UsersAPI = {
  list: async () => {
    const response = await api.get('/v1/users')
    return flattenJsonApiResponse(response.data)
	},
  get: async (id) => {
    const response = await api.get(`/v1/users/${id}`)
    return flattenJsonApiResponse(response.data)
  },
  follow: async (id) => {
    return await api.patch(`/v1/users/${id}/follow`)
  },
  unfollow: async (id) => {
    return await api.patch(`/v1/users/${id}/unfollow`)
  }
}

export const CommentsAPI = {
  create: async (postId, content) => {
    const response = await api.post(`/v1/posts/${postId}/comments`, {
			content
    })
    return flattenJsonApiResponse(response.data)
  },
  update: async (postId, commentId, content) => {
    const response = await api.put(`/v1/posts/${postId}/comments/${commentId}`, {
      data: {
        id: commentId,
        type: "comment",
        attributes: { content }
      }
    })
    return flattenJsonApiResponse(response.data)
  },
  delete: async (postId, commentId) => {
    return await api.delete(`/v1/posts/${postId}/comments/${commentId}`)
  }
}

export const MessagesAPI = {
  create: async (messageData) => {
    const response = await api.post("/v1/messages", messageData)
		if (response.status === 200) {
			return true
		}
		return false
  }
}

export default api
