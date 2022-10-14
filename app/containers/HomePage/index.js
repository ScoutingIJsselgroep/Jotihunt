/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectRepos, makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import messages from './messages';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';

import styled from 'styled-components';

const participants = require('./participants.jpg');

const Header = styled.header`
      height: 50vh;
    min-height: 300px;
    background: url(${participants}) center center no-repeat scroll;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    background-size: cover;
    -o-background-size: cover;
`;


export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
  }

  render() {
    const { loading, error, repos } = this.props;
    const reposListProps = {
      loading,
      error,
      repos,
    };

    return (
      <article className="container">
        <Helmet
          title="Home"
          titleTemplate="%s | Jotihunt.js"
          meta={[
            {
              name: 'description',
              content: 'Jotihunt is altijd in het derde weekend van oktober, tegelijk met JOTA-JOTI. Dit jaar vindt het plaats op 14, 15 en 16 oktober.',
            },
          ]}
        />
        <div className="container">
          <Header className="business-header">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                </div>
              </div>
            </div>
          </Header>
          <div className="container">

            <div className="row">
              <div className="col-sm-8">
                <h2 className="mt-4">Voorbereidingen gaan beginnen!</h2>
                <p>Dit is een jaarlijkse interactieve vossenjacht voor scoutinggroepen die wordt georganiseerd door een organisatieteam bestaande uit enthousiaste vrijwilligers. Bij dit evenement jagen ('hunten') de deelnemende scoutinggroepen op vossenteams. De vossenteams, bestaande uit drie personen, verplaatsen zich door Gelderland. De locatie van de vossen wordt via hints bekend gemaakt via de spelsite, het is aan de deelnemende scoutinggroepen om deze hints te ontcijferen en zo een informatie te krijgen over de locatie en looproute van de vossenteams, hierbij is het doel om de vossenteams te kunnen vinden ('hunten'). Vossenteams bewegen zich langs deelnemende scoutinggroepen met als doel bij deze groep een tegenhunt te plaatsen. Naast het oplossen van hints en het jagen op de vossenteams krijgen de deelnemende scoutinggroepen opdrachten om uit te voeren. Geslaagde hints en het insturen van opdrachten leveren punten op. De scoutinggroep die na 26 uur de meeste punten heeft, wint de Jotihunt... .</p>
              </div>
              <div className="col-sm-4">
                <h2 className="mt-4">Contact</h2>
                <address>
                  <strong>Scouting IJsselgroep en Scouting de Witte Wieven</strong>
                  <br />Kwekerijweg 5
                    <br />7213AX Gorssel
                      <br />
                </address>
                <address>
                  <abbr title="Email"><span className="fa fa-at"></span></abbr>&nbsp;
                  <a href="mailto:jotihunt@scouting-ijsselgroep.nl">jotihunt@scouting-ijsselgroep.nl</a>
                </address>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  repos: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  onSubmitForm: React.PropTypes.func,
  username: React.PropTypes.string,
  onChangeUsername: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
