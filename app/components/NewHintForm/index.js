/**
*
* NewHintForm
*
*/


import React, { PropTypes } from 'react';
import { Form, Text } from 'react-form';
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
          if (values.values.rdx && values.values.rdx.length === 5 && values.values.rdy && values.values.rdy.length === 5) {
            this.props.onCoordinateChange(values.values);
          }
        }}
        validate={({ rdx, rdy }) =>
          ({
            rdx: (!rdx || rdx.length !== 5 || isNaN(parseInt(rdx))) ? 'Dit getal moet 5 tekens lang zijn' : null,
            rdy: (!rdy || rdy.length !== 5 || isNaN(parseInt(rdy))) ? 'Dit getal moet 5 tekens lang zijn' : null,
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
