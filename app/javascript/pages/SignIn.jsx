import React, { useState } from 'react'
import ZuckerLayout from '../components/Layout/ZuckerLayout'
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Container, Box, Button, Flex, Card, Heading, TextField, Text } from '@radix-ui/themes'
import { AuthAPI } from '../services/api'

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isAuthenticated } = useAuth()

  const from = location.state?.from?.pathname

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([])
    setLoading(true)

    try {
      const json = await AuthAPI.signIn({ user: formData })
      const { user, token } = json
      login(user, token)
      navigate(from && from !== '/z/sign_in' ? from : '/z', { replace: true })
    } catch (error) {
			console.log(error)
      const errorMessage = error.response?.data?.errors ||
                          [error.response?.data?.status?.message || 'Invalid email or password']
      setErrors(Array.isArray(errorMessage) ? errorMessage : [errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

	if (isAuthenticated) {
		return <Navigate to="/z" replace />
	}
  return (
		<ZuckerLayout>
			<Container className="p-4">
				<Flex justify="center" align="center" className="h-full">
					<Box className="sm:w-full md:w-1/2 lg:w-1/3" style={{ minWidth: '400px', maxWidth: '500px' }}>
						<Card className="card mt-5 zucker-panel">
							<Heading as="h2" size="7" className="border-b text-center">
								Sign In
							</Heading>
							<div className="card-body">
								{errors.length > 0 && (
									<Box mb="3" p="3" style={{
										backgroundColor: 'var(--red-1)',
										border: '1px solid var(--red-6)',
										borderRadius: 'var(--radius-2)'
									}}>
										<Text color="red" size="2" weight="medium">Please fix the following errors:</Text>
										<ul className="mb-0 mt-2">
											{errors.map((error, index) => (
												<li key={`error-${index}-${error}`}>
													<Text color="red" size="2">{error}</Text>
												</li>
											))}
										</ul>
									</Box>
								)}

								<form onSubmit={handleSubmit}>
									<Box mb="3">
										<label htmlFor="email" className="form-label">
											<Text size="2" weight="medium">Email Address</Text>
										</label>
										<TextField.Root
											type="email"
											id="email"
											name="email"
											value={formData.email}
											onChange={handleChange}
											placeholder="Enter your email"
											required
										/>
									</Box>

									<Box mb="4">
										<label htmlFor="password" className="form-label">
											<Text size="2" weight="medium">Password</Text>
										</label>
										<TextField.Root
											type="password"
											id="password"
											name="password"
											value={formData.password}
											onChange={handleChange}
											placeholder="Enter your password"
											required
										/>
									</Box>

									<Box mb="3">
										<Button
											type="submit"
											disabled={loading}
											className="w-full"
											size="3"
										>
											{loading ? 'Signing In...' : 'Sign In'}
										</Button>
									</Box>
								</form>

								<Box className="text-center">
									<Text size="2" color="gray">
										Don't have an account? <Link to="/z/sign_up">Sign up</Link>
									</Text>
								</Box>
							</div>
						</Card>
					</Box>
				</Flex>
			</Container>
		</ZuckerLayout>
  )
}

export default SignIn
