import React, { useState } from 'react'
import Zuckerbar from '../Zuckerbar'
import { Theme, ThemePanel, Container, Box } from "@radix-ui/themes";

function AppLayout({ children }) {
	const [isThemePanelOpen, setIsThemePanelOpen] = useState(false)

	const toggleThemePanel = () => {
		setIsThemePanelOpen(!isThemePanelOpen)
	}

  return (
    <Theme appearance="dark" accentColor="crimson" grayColor="sand" radius="large" scaling="100%">
      <Box className="fixed top-0 w-full z-50" id="Zuckerbar" style={{ height: "50px" }}>
        <Zuckerbar />
      </Box>

      { isThemePanelOpen && <ThemePanel /> }

      <Container className="zucker-background" minHeight="100vh" id="main">
				<Box style={{ paddingTop: "50px" }}>
					{ children }
				</Box>
      </Container>
    </Theme>
  )
}

export default AppLayout
