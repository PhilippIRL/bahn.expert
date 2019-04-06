// @flow
import { connect } from 'react-redux';
import { type ContextRouter, withRouter } from 'react-router-dom';
import { format } from 'date-fns';
import { getNextDeparture } from 'Abfahrten/selector/abfahrten';
import ActionHome from '@material-ui/icons/Home';
import AppBar from '@material-ui/core/AppBar';
import HeaderButtons from './HeaderButtons';
import Helmet from 'react-helmet-async';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import StationSearch from 'Common/Components/StationSearch';
import Toolbar from '@material-ui/core/Toolbar';
import type { Abfahrt } from 'types/abfahrten';
import type { AbfahrtenState } from 'AppState';
import type { Station } from 'types/station';

type StateProps = {|
  +currentStation: ?$PropertyType<$PropertyType<AbfahrtenState, 'abfahrten'>, 'currentStation'>,
  +searchType?: StationSearchType,
  +baseUrl: string,
  +nextAbfahrt: ?Abfahrt,
|};

type OwnProps = {||};
type DispatchProps = {|
  dispatch: Function,
|};

type ReduxProps = {|
  ...OwnProps,
  ...StateProps,
  ...DispatchProps,
|};
type Props = {|
  ...ReduxProps,
  ...ContextRouter,
|};

class Header extends React.Component<Props> {
  metaTags = () => {
    const { currentStation, baseUrl, nextAbfahrt } = this.props;

    let title = 'Bahnhofsabfahrten';
    let ogDescription =
      'Zugabfahrten für Stationen der Deutsche Bahn. Nutzt verschiedene Quellen um möglichst genaue Informationen bereitzustellen. Nutzt teilweise offizielle, teilweise inoffizielle Quellen.';
    let description = ogDescription;
    let url = `https://${baseUrl}`;
    const image = `https://${baseUrl}/android-chrome-384x384.png`;

    if (currentStation) {
      title = `${currentStation.title} - ${title}`;
      description = `Zugabfahrten für ${currentStation.title}`;
      ogDescription = description;
      if (nextAbfahrt && nextAbfahrt.scheduledDeparture) {
        ogDescription = `Nächste Abfahrt: ${nextAbfahrt.train} - ${nextAbfahrt.destination} - ${format(
          nextAbfahrt.scheduledDeparture,
          'HH:mm'
        )} (${nextAbfahrt.delayDeparture < 0 ? '-' : '+'}${nextAbfahrt.delayDeparture})`;
      }
      url += `/${encodeURIComponent(currentStation.title)}`;
    }

    return (
      <Helmet>
        <title>{title}</title>
        <link rel="canonical" href={url} />
        <meta name="description" content={description} />
        {/* Twitter Start */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@marudor" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={ogDescription} />
        <meta name="twitter:creator" content="@marudor" />
        <meta name="twitter:image" content={image} />
        {/* Twitter End */}
        {/* Open Graph Start */}
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta property="og:locale" content="de_DE" />
        {/* Open Graph End */}
      </Helmet>
    );
  };
  submit = (station: Station) => {
    if (!station) {
      return;
    }
    this.props.history.push(`/${encodeURIComponent(station.title)}`);
  };
  toRoot = () => this.props.history.push('/');
  render() {
    const { currentStation, searchType } = this.props;

    return (
      <>
        {this.metaTags()}
        <AppBar position="fixed">
          <Toolbar disableGutters>
            <IconButton aria-label="Home" onClick={this.toRoot} color="inherit">
              <ActionHome color="inherit" />
            </IconButton>
            <StationSearch
              autoFocus={!currentStation}
              searchType={searchType}
              value={currentStation}
              onChange={this.submit}
              placeholder="Bahnhof (z.B. Hamburg Hbf)"
            />
            <HeaderButtons />
          </Toolbar>
        </AppBar>
      </>
    );
  }
}

export default connect<ReduxProps, OwnProps, StateProps, DispatchProps, AbfahrtenState, _>(state => ({
  currentStation: state.abfahrten.currentStation,
  searchType: state.config.config.searchType,
  baseUrl: state.config.baseUrl,
  nextAbfahrt: getNextDeparture(state),
}))(withRouter(Header));