/*
 *
 * About
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

export class About extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="row container">
        <Helmet
          title="Over Jotihunt"
          titleTemplate="%s | Jotihunt.js"
          meta={[
            { name: 'description', content: 'Jotihunt is altijd in het derde weekend van oktober, tegelijk met JOTA-JOTI. Dit jaar vindt het plaats op 20, 21 en 22 oktober.' },
          ]}
        />
        <div className="col-sm-12">
          <h2>Wat is de Jotihunt?</h2>
          Dit is een jaarlijkse interactieve vossenjacht die wordt georganiseerd door het organisatieteam. Bij dit
          evenement jagen (‘hunten’) de deelnemende scoutinggroepen op vossenteams. De vossenteams, bestaande uit drie
          personen, verplaatsen zich door Gelderland. De locatie van de vossen wordt via hints bekend gemaakt via de
          spelsite, het is aan de deelnemende scoutinggroepen om deze hints te ontcijferen en zo een informatie te
          krijgen over de locatie en looproute van de vossenteams, hierbij is het doel om de vossenteams te kunnen
          vinden (‘hunten’). Vossenteams bewegen zich binnen een eigen deelgebied van Gelderland, met als doel een
          tegenhunt te plaatsen bij de deelnemende groepen binnen dit deelgebied. Naast het oplossen van hints en het
          jagen op de vossenteams krijgen de deelnemende scoutinggroepen opdrachten om uit te voeren. Geslaagde hints en
          het insturen van opdrachten leveren punten op. De scoutinggroep die na 30 uur de meeste punten heeft, wint de
          Jotihunt.

          <h2>Wanneer?</h2>
          Jotihunt is altijd in het derde weekend van oktober, tegelijk met JOTA-JOTI. Dit jaar vindt het plaats op 20,
          21 en 22 oktober. <br />
          Jotihunt begint op zaterdag om 09.00uur en duurt tot zondagmiddag 15.00uur. <br />
          De gehele activiteit duurt 30 uur, non-stop. <br />

          <h2>Voor wie?</h2>
          Jotihunt is, in basis, een activiteit voor Scouts vanaf 15 jaar (explorers, roverscouts, stam en leiding).
          Opdrachten, hints en het spel zijn gericht op en geschikt voor deze leeftijdsgroep.
          Scoutinggroepen kunnen meedoen als hun thuislocatie zich in Gelderland bevindt (tenzij anders, in overleg met
          organisatie op redelijk termijn voorafgaand aan de Jotihunt, is overeengekomen). Zie spelregels punt 3
          'groepen'.
          Scoutinggroepen mogen meedoen, mits zij zich op tijd hebben ingeschreven bij de organisatie bij inschrijving
          het deelnamegeld hebben voldaan via iDEAL.

          <h2>Jotihunt thema?</h2>
          Elke Jotihunt heeft een thema, dit thema wordt kort voordat de spelsite online gaat bekend gemaakt. Alle
          opdrachten en hints zullen in de sfeer van dit thema zijn.
        </div>
      </div>
    );
  }
}

About.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(About);
