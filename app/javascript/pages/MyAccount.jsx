import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import ZuckerLayout from '../components/Layout/ZuckerLayout'
import {
  Container,
  Box,
  Button,
  Flex,
  Card,
  Heading,
  Text,
  Avatar,
  Separator,
  Badge
} from '@radix-ui/themes'
import {
  PersonIcon,
  EnvelopeClosedIcon,
  CalendarIcon,
  ExitIcon,
  ExclamationTriangleIcon
} from '@radix-ui/react-icons'

const MyAccount = () => {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      setLoading(true)
      logout()
      navigate('/z/sign_in')
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (!currentUser) {
    return (
      <ZuckerLayout>
        <Container className="p-4">
          <Flex justify="center" align="center" className="h-full">
            <Box className="sm:w-full md:w-1/2 lg:w-1/3" style={{ minWidth: '400px', maxWidth: '500px' }}>
              <Card className="card mt-5 zucker-panel">
                <Heading as="h2" size="7" className="border-b text-center">
                  Account Not Found
                </Heading>
                <Box p="4" className="text-center">
                  <Text size="3" color="gray">Please sign in to view your account.</Text>
                </Box>
              </Card>
            </Box>
          </Flex>
        </Container>
      </ZuckerLayout>
    )
  }

  return (
    <ZuckerLayout>
      <Container className="p-4">
        <Flex justify="center" align="center" className="h-full">
          <Box className="sm:w-full md:w-2/3 lg:w-1/2" style={{ minWidth: '400px', maxWidth: '600px' }}>
            <Card className="card mt-5 zucker-panel">
              <Heading as="h2" size="7" className="border-b text-center">
                My Account
              </Heading>

              <Box p="4">
                <Flex direction="column" align="center" mb="4">
                  <Avatar
                    size="6"
                    src={currentUser.avatar_url}
                    fallback={currentUser.name?.charAt(0) || "U"}
                    radius="full"
                    mb="3"
                  />
                  <Heading size="5" mb="1">{currentUser.name}</Heading>
                  {currentUser.banned && (
                    <Badge color="red" variant="soft" mb="2">
                      <ExclamationTriangleIcon width="12" height="12" />
                      Account Banned
                    </Badge>
                  )}
                </Flex>

                <Separator size="4" mb="4" />

                <Box mb="4">
                  <Flex direction="column" gap="3">
                    <Flex align="center" gap="2">
                      <Box>
												<EnvelopeClosedIcon width="20" height="20" color="gray" />
												<Text size="2"> </Text>
                        <Text size="3" color="gray" weight="medium">Email</Text>
                      </Box>
											<Text size="3">{currentUser.email}</Text>
                    </Flex>

                    <Flex align="center" gap="3">
                      <Box>
												<CalendarIcon width="20" height="20" color="gray" />
												<Text size="2"> </Text>
                        <Text size="3" color="gray" weight="medium">Member since</Text>
                      </Box>
											<Text size="3">{formatDate(currentUser.created_at)}</Text>
                    </Flex>

										{
											currentUser?.banned && (
												<div className="alert alert-danger">
													<strong>Account Status:</strong> Banned
												</div>
											)
										}

										<Flex align="center" gap="3">
											<Box>
												<PersonIcon width="20" height="20" color="gray" />
												<Text size="2"> </Text>
												<Text size="3" color="gray" weight="medium">Sign in times</Text>
											</Box>
											<Text size="3">{currentUser.sign_in_count}</Text>
										</Flex>

										<Flex align="center" gap="3">
											<Box>
												<CalendarIcon width="20" height="20" color="gray" />
												<Text size="2"> </Text>
												<Text size="3" color="gray" weight="medium">Last sign in</Text>
											</Box>
											<Text size="3">{formatDate(currentUser.last_sign_in_at)}</Text>
										</Flex>
                  </Flex>
                </Box>

                <Separator size="4" mb="4" />

                <Flex direction="column" gap="3">
                  <Button
                    variant="soft"
                    color="red"
                    size="3"
                    onClick={handleLogout}
                    disabled={loading}
                    className="w-full"
                  >
                    <ExitIcon width="16" height="16" />
                    {loading ? 'Logging out...' : 'Sign Out'}
                  </Button>
                </Flex>
              </Box>
            </Card>
          </Box>
        </Flex>
      </Container>
    </ZuckerLayout>
  )
}

export default MyAccount
