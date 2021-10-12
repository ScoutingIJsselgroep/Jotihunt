/**
*
* NewHintForm
*
*/


import React, { PropTypes } from 'react';
import { Form, Text, Select } from 'react-form';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

class NewHintForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const myForm = (
      <Form
        onSubmit={(values) => {
          this.props.onSubmitCoordinates();
        }}
        onChange={(values) => {
          if (values.values.rdx && (values.values.rdx.length === 5 || values.values.rdx.length === 4) && values.values.rdy && (values.values.rdy.length === 5 || values.values.rdy.length === 4)) {
            this.props.onCoordinateChange(values.values);
          }
        }}
        validate={({ rdx, rdy }) =>
          ({
            rdx: (!rdx || !(rdx.length === 5 || rdx.length === 4) || isNaN(parseInt(rdx))) ? 'Dit getal moet 4 of 5 tekens lang zijn' : null,
            rdy: (!rdy || !(rdy.length === 5 || rdx.length === 4) || isNaN(parseInt(rdy))) ? 'Dit getal moet 4 of 5 tekens lang zijn' : null,
          })
        }
      >
        {({ submitForm }) =>
          (
            <form onSubmit={submitForm}>
              <div className="form-group">
                <span htmlFor="rdy">Rijksdriehoek X</span>
                <Text className="form-control" field="rdy" placeholder="21146" />
              </div>
              <div className="form-group">
                <span htmlFor="rdx">Rijksdriehoek Y</span>
                <Text className="form-control" field="rdx" placeholder="46828" />
              </div>
              <div className="form-group">
                <span htmlFor="subarea">Deelgebied</span>
                <Select
                  className="form-control"
                  field='subarea'
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
              </div>
              <button type="submit" className="btn btn-default">Versturen</button>
            </form>
          )
        }
      </Form>
    );
    return (
      <div>
        {myForm}
      </div>
    );
  }
}

NewHintForm.propTypes = {
  onCoordinateChange: PropTypes.func.isRequired,
  onSubmitCoordinates: PropTypes.func.isRequired,
};

export default NewHintForm;
