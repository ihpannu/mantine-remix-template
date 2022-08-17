import { Global, MantineProvider } from "@mantine/core"
import { ModalsProvider } from "@mantine/modals"
import { NotificationsProvider } from "@mantine/notifications"
import { StylesPlaceholder } from "@mantine/remix"
import type { SpotlightAction } from "@mantine/spotlight"
import { SpotlightProvider } from "@mantine/spotlight"
import type { MetaFunction } from "@remix-run/node"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
} from "@remix-run/react"
import { IconBox, IconSearch } from "@tabler/icons"
import { Layout } from "./Layout"
import { theme } from "./theme"
export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
})

export default function App() {
  const navigate = useNavigate()

  const actions: SpotlightAction[] = [
    {
      title: "Orders In Transit",
      description: "Get to active orders",
      onTrigger: () => navigate("/"),
      icon: <IconBox size={18} />,
      group: "Suggestions",
    },
  ]

  return (
    <MantineProvider
      theme={{
        ...theme,
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Global
        styles={(theme) => ({
          body: {
            color:
              theme.colorScheme === "dark"
                ? theme.colors.dark[1]
                : theme.colors.gray[8],
            fontSize: 15,
          },
        })}
      />
      <SpotlightProvider
        shortcut={["mod + P", "mod + K", "/"]}
        highlightQuery
        actions={actions}
        searchIcon={<IconSearch size={18} />}
        searchPlaceholder="Search..."
        nothingFoundMessage="Nothing found..."
      >
        <ModalsProvider labels={{ confirm: "Submit", cancel: "Cancel" }}>
          <NotificationsProvider>
            <html lang="en">
              <head>
                <Meta />
                <Links />
                <StylesPlaceholder />
              </head>
              <body>
                <Layout>
                  <Outlet />
                </Layout>
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
              </body>
            </html>
          </NotificationsProvider>
        </ModalsProvider>
      </SpotlightProvider>
    </MantineProvider>
  )
}
