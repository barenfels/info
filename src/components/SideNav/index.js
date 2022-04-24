import React from 'react'
import styled from 'styled-components'
import { AutoRow } from '../Row'
import Title from '../Title'
import { BasicLink } from '../Link'
import { useMedia } from 'react-use'
import { TYPE } from '../../Theme'
import { Analytics16, ProgressBarRound16, JoinInner16, UserData16 } from '@carbon/icons-react'
import { withRouter } from 'react-router-dom'
import { TrendingUp, List, PieChart, Disc } from 'react-feather'
import Link from '../Link'
import { useSessionStart } from '../../contexts/Application'
import { useDarkModeManager } from '../../contexts/LocalStorage'
import Toggle from '../Toggle'

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.bg1};
  color: ${({ theme }) => theme.text1};
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 1rem;
  height: 4.5rem;
  position: sticky;
  top: 0px;
  z-index: 9999;
  box-sizing: border-box;
  color: ${({ theme }) => theme.bg2};
  box-shadow: rgb(0 0 0 / 25%) 0px 2px 6px;

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
    position: relative;
  }
`

const Option = styled.div`
  font-weight: 500;
  font-size: 14px;
  opacity: ${({ activeText }) => (activeText ? 1 : 0.6)};
  color: ${({ theme }) => theme.text1};
  display: flex;
  align-items: center;
  > :first-child {
    margin-right: 0.75rem !important;
  }
  :hover {
    opacity: 1;
  }
`

const DesktopWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

const MobileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const HeaderText = styled.div`
  margin-right: 0.75rem;
  font-size: 0.825rem;
  font-weight: 500;
  display: inline-box;
  display: -webkit-inline-box;
  opacity: 0.8;
  :hover {
    opacity: 1;
  }
  a {
    color: ${({ theme }) => theme.text1};
  }
`

const Polling = styled.div`
  display: flex;
  justify-self: flex-end;
  flex: 0 1 auto;
  opacity: 0.4;
  width: 130px;
  transition: opacity 0.25s ease;
  :hover {
    opacity: 1;
  }
`
const PollingDot = styled.div`
  width: 8px;
  height: 8px;
  min-height: 8px;
  min-width: 8px;
  margin-right: 0.5rem;
  margin-top: 3px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.green1};
`

function SideNav({ history }) {
  const below1080 = useMedia('(max-width: 1080px)')

  const below1180 = useMedia('(max-width: 1180px)')

  const seconds = useSessionStart()

  const [isDark, toggleDarkMode] = useDarkModeManager()

  return (
    <Wrapper isMobile={below1080}>
      {!below1080 ? (
        <DesktopWrapper>
          <AutoRow gap="0" style={{ margin: '0 .75rem', height: '100%' }} justify="flex-end">
            <Title />

            {!below1080 && (
              <AutoRow gap="1.25rem" style={{ margin: '0', height: '100%', width: 'auto' }}>
                <BasicLink to="/home">
                  <Option activeText={history.location.pathname === '/home' ?? undefined}>
                    <Analytics16 />
                    Overview
                  </Option>
                </BasicLink>
                <BasicLink to="/tokens">
                  <Option
                    activeText={
                      (history.location.pathname.split('/')[1] === 'tokens' ||
                        history.location.pathname.split('/')[1] === 'token') ??
                      undefined
                    }
                  >
                    <ProgressBarRound16 />
                    Tokens
                  </Option>
                </BasicLink>
                <BasicLink to="/pairs">
                  <Option
                    activeText={
                      (history.location.pathname.split('/')[1] === 'pairs' ||
                        history.location.pathname.split('/')[1] === 'pair') ??
                      undefined
                    }
                  >
                    <JoinInner16 />
                    Pairs
                  </Option>
                </BasicLink>

                <BasicLink to="/accounts">
                  <Option
                    activeText={
                      (history.location.pathname.split('/')[1] === 'accounts' ||
                        history.location.pathname.split('/')[1] === 'account') ??
                      undefined
                    }
                  >
                    <UserData16 />
                    Accounts
                  </Option>
                </BasicLink>
              </AutoRow>
            )}
            {!below1180 && (
              <Polling style={{ marginLeft: '.5rem' }}>
                <PollingDot />
                <a href="/">
                  <TYPE.small>
                    Updated {!!seconds ? seconds + 's' : '-'} ago <br />
                  </TYPE.small>
                </a>
              </Polling>
            )}
          </AutoRow>
          {false && (
            <AutoRow gap="0.5rem" style={{ marginLeft: '.75rem', marginBottom: '4rem' }}>
              <Toggle isActive={isDark} toggle={toggleDarkMode} />
              <HeaderText>
                <Link href="https://cronus.ac" target="_blank">
                  Cronus Protocol
                </Link>
              </HeaderText>

              <HeaderText>
                <Link href="" target="_blank">
                  Docs
                </Link>
              </HeaderText>
              <HeaderText>
                <Link href="https://discord.gg/cronusfinance" target="_blank">
                  Discord
                </Link>
              </HeaderText>
              <HeaderText>
                <Link href="https://twitter.com/cronusfinance" target="_blank">
                  Twitter
                </Link>
              </HeaderText>
            </AutoRow>
          )}
        </DesktopWrapper>
      ) : (
        <MobileWrapper>
          <Title />
        </MobileWrapper>
      )}
    </Wrapper>
  )
}

export default withRouter(SideNav)
