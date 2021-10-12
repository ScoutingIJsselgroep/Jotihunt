/**
*
* GroupMarker
*
*/

import React, { PropTypes } from 'react';
import { InfoWindow, Marker } from 'react-google-maps';
import { Form, Select } from 'react-form';
import Gpsbutton from '../Gpsbutton/index';
// import styled from 'styled-components';

const groupIcon = require('./group-pm.png');
const organisationIcon = require('./organisation.png');

function getCoordinates(lat, lng) {
  return { lat: coordinates[1], lng: coordinates[0] };
}

class GroupMarker extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.onToggleOpen = this.onToggleOpen.bind(this);
    //this.props.group.isOpen = false;
  }

  onToggleOpen() {
    this.props.group.isOpen = !this.props.group.isOpen;
    this.forceUpdate();
  }

  render() {
    const group = this.props.group;
    return (
      <Marker icon={groupIcon} position={{ lat: group.latitude, lng: group.longitude}} onClick={this.onToggleOpen}>
        {group.isOpen && <InfoWindow onCloseClick={this.onToggleOpen}>
          <div>
            <b>{group.name}</b><br/>
            <span dangerouslySetInnerHTML={{ __html: group.location }} /><br /><br />
            <b>Selecteer deelgebied</b><br />
            <Form defaultValues={{ subarea: group.Subarea ? group.Subarea.name : '' }}>

              <Select
                className="form-control"
                field='subarea'
                onChange={(evt) => this.props.changeSubarea(evt, group.id)}
                options={[
                {
                  label: 'Alpha',
                  value: 'Alpha',
                  key: 0
                }, {
                  label: 'Bravo',
                  value: 'Bravo',
                  key: 1
                }, {
                  label: 'Charlie',
                  value: 'Charlie',
                  key: 2
                }, {
                  label: 'Delta',
                  value: 'Delta',
                  key: 3
                }, {
                  label: 'Echo',
                  value: 'Echo',
                  key: 4
                }, {
                  label: 'Foxtrot',
                  value: 'Foxtrot',
                  key: 5
                }, {
                  label: 'n.n.b.',
                  value: 'n.n.b.',
                  key: 6
                }, {
                  label: 'Alpha 2',
                  value: 'Alpha 2',
                  key: 7
                }, {
                  label: 'Bravo 2',
                  value: 'Bravo 2',
                  key: 8
                }, {
                  label: 'Charlie 2',
                  value: 'Charlie 2',
                  key: 9
                }, {
                  label: 'Delta 2',
                  value: 'Delta 2',
                  key: 10
                }, {
                  label: 'Echo 2',
                  value: 'Echo 2',
                  key: 11
                }, {
                  label: 'Foxtrot 2',
                  value: 'Foxtrot 2',
                  key: 12
                }]}
              />
            </Form>

            <br />
            <b>Navigatie</b><br />
            <Gpsbutton latitude={group.latitude} longitude={group.longitude} />
          </div>
        </InfoWindow>}
      </Marker>
    );
  }
}

GroupMarker.propTypes = {
  group: PropTypes.object.isRequired,
};

export default GroupMarker;
