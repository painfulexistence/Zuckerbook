import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Box, Text, Button, Flex, TextField, Badge } from '@radix-ui/themes'
import { MagnifyingGlassIcon, GearIcon, ExitIcon, PersonIcon, EnterIcon } from '@radix-ui/react-icons'

function Zuckerbar() {
  const [searchKey, setSearchKey] = useState("")
  const navigate = useNavigate()
  const { currentUser, isAuthenticated, logout } = useAuth()

  const isUserBanned = currentUser?.banned || false

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/z/posts?key=${encodeURIComponent(searchKey)}`)
  }

  const handleSignOut = () => {
    if (confirm("Are you sure to leave?")) {
      logout()
      navigate('/z/sign_in')
    }
  }

  return (
    <Box
			className="bg-dark border-b border-gray-200"
      style={{
        borderBottom: '1px solid var(--gray-6)',
        padding: 'var(--space-3)'
      }}
    >
      <Flex align="center" justify="between" gap="4">
				<Flex gap="4">
					<Link to="/z" style={{ textDecoration: 'none' }}>
						<Text size="6" weight="bold" color="white">Zuckerbook</Text>
					</Link>

					<Box style={{ flex: 1, maxWidth: '400px' }}>
						<form onSubmit={handleSearch}>
							<Flex gap="2">
								<TextField.Root
									type="text"
									placeholder="Search posts..."
									required
									value={searchKey}
									onChange={(e) => setSearchKey(e.target.value)}
								/>
								<Button type="submit" size="2" variant="soft">
									<MagnifyingGlassIcon width="14" height="14" />
								</Button>
							</Flex>
						</form>
					</Box>
				</Flex>

        {isUserBanned && (
          <Badge color="red" variant="solid">
            You're Zucked
          </Badge>
        )}

        <Flex gap="2">
          {isAuthenticated ? (
            <>
              {/* <Button asChild variant="soft" size="2">
                <Link to="/z/my_account">
                  <GearIcon width="14" height="14" />
                  Account
                </Link>
              </Button> */}
              <Button
                variant="soft"
                color="red"
                size="2"
                onClick={handleSignOut}
              >
                <ExitIcon width="14" height="14" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="soft" size="2">
                <Link to="/z/sign_up">
                  <PersonIcon width="14" height="14" />
                  Sign Up
                </Link>
              </Button>
              <Button asChild variant="soft" size="2">
                <Link to="/z/sign_in">
                  <EnterIcon width="14" height="14" />
                  Sign In
                </Link>
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  )
}

export default Zuckerbar
