import React, { useState } from 'react'
import ZuckerLayout from '../components/Layout/ZuckerLayout'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Container, Box, Button, Flex, Card, Heading, TextField, Text } from '@radix-ui/themes'
import { AuthAPI } from '../services/api'

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

    const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([])
    setLoading(true)

    try {
      const response = await AuthAPI.signUp({ user: formData })
      const { user, token } = response
      login(user, token)
      navigate('/z', { replace: true })
    } catch (error) {
      console.log(error)
      const errorMessage = error.response?.data?.errors ||
                          [error.response?.data?.status?.message || 'Registration failed']
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

  return (
    <ZuckerLayout>
      <Container className="p-4">
        <Flex justify="center" align="center" className="h-full">
          <Box className="sm:w-full md:w-1/2 lg:w-1/3" style={{ minWidth: '400px', maxWidth: '500px' }}>
            <Card className="card mt-5 zucker-panel">
              <Heading as="h2" size="7" className="border-b text-center">
                Create Account
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
                    <label htmlFor="name" className="form-label">
                      <Text size="2" weight="medium">Full Name</Text>
                    </label>
                    <TextField.Root
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </Box>

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

                  <Box mb="3">
                    <label htmlFor="password" className="form-label">
                      <Text size="2" weight="medium">Password</Text>
                    </label>
                    <TextField.Root
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a strong password"
                      required
                    />
                  </Box>

                  <Box mb="4">
                    <label htmlFor="password_confirmation" className="form-label">
                      <Text size="2" weight="medium">Confirm Password</Text>
                    </label>
                    <TextField.Root
                      type="password"
                      id="password_confirmation"
                      name="password_confirmation"
                      value={formData.password_confirmation}
                      onChange={handleChange}
                      placeholder="Confirm your password"
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
                      {loading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                  </Box>
                </form>

                <Box className="text-center">
                  <Text size="2" color="gray">
                    Already have an account? <Link to="/z/sign_in">Sign In</Link>
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

export default SignUp
