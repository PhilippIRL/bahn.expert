/* eslint-disable no-underscore-dangle */
import { createTheme } from '@/client/Themes';
import { HeadProvider } from 'react-head';
import { InnerCommonConfigProvider } from '@/client/Common/provider/CommonConfigProvider';
import { MemoryRouter, useLocation } from 'react-router';
import { Navigation } from '@/client/Common/Components/Navigation';
import { render as realRender } from '@testing-library/react';
import { StorageContext } from '@/client/useStorage';
import { ThemeProvider } from '@/client/Common/provider/ThemeProvider';
import { ThemeWrap } from '@/client/ThemeWrap';
import Cookies from 'universal-cookie';
import type { CommonConfig } from '@/client/Common/config';
import type { Location } from 'react-router';
import type { ReactElement } from 'react';
import type { Theme } from '@mui/material';
import type { ThemeType } from '@/client/Themes/type';

let currentThemeType: E<typeof ThemeType>;

let theme: Theme;

interface ContextWithOptions<V = any> extends React.Context<V> {
  initialState?: V;
}
export interface ProviderWithOptions<
  out C extends React.FunctionComponent = React.FunctionComponent<any>,
> {
  Provider: C;
  // FIXME: should be Props of C
  initialState?: any;
}
interface Options {
  withNavigation?: boolean;
  provider?: ProviderWithOptions[];
  context?: ContextWithOptions[];
  commonConfig?: Partial<CommonConfig>;
}

let location: Location;

const LocationHelper = ({ children }: any) => {
  location = useLocation();

  return children;
};

export function render(
  ui: ReactElement,
  { withNavigation, context, commonConfig, provider }: Options = {},
): Omit<ReturnType<typeof realRender>, 'container'> & {
  container: ChildNode | null;
  theme: Theme;
  cookies: Cookies;
  getLocation: () => Location;
} {
  const themeType = 'dark';

  if (currentThemeType !== themeType) {
    currentThemeType = themeType;
    theme = createTheme(currentThemeType);
  }

  const cookies = new Cookies();
  const wrapper = ({ children }: any) => {
    let result = children;

    if (withNavigation) {
      result = <Navigation>{result}</Navigation>;
    }

    if (context) {
      for (const c of context) {
        result = <c.Provider value={c.initialState}>{result}</c.Provider>;
      }
    }

    if (provider) {
      for (const { Provider, initialState } of provider) {
        result = <Provider {...initialState}>{result}</Provider>;
      }
    }

    const mergedCommonConfig: CommonConfig = {
      showUIC: false,
      fahrzeugGruppe: false,
      autoUpdate: 0,
      hideTravelynx: false,
      showCoachType: false,
      delayTime: false,
      lineAndNumber: false,
      showCancelled: true,
      sortByTime: false,
      onlyDepartures: false,
      startTime: undefined,
      lookahead: '115020',
      lookbehind: '10',
      showRl100: false,
      ...commonConfig,
    };

    return (
      <InnerCommonConfigProvider initialConfig={mergedCommonConfig}>
        <HeadProvider>
          <MemoryRouter>
            <LocationHelper>
              <StorageContext.Provider value={cookies}>
                <ThemeProvider>
                  <ThemeWrap>{result}</ThemeWrap>
                </ThemeProvider>
              </StorageContext.Provider>
            </LocationHelper>
          </MemoryRouter>
        </HeadProvider>
      </InnerCommonConfigProvider>
    );
  };

  const view = realRender(ui, { wrapper });

  return {
    ...view,
    container: view.container.firstChild,
    theme,
    cookies,
    getLocation: () => location,
  };
}
