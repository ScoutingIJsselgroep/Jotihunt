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

        }}
        onChange={(values) => {
          this.props.onCoordinateChange(values.values);
        }}
        validate={({ rdx, rdy }) =>
          ({
            rdx: (!rdx || rdx.length !== 5) ? 'Dit getal moet 5 tekens lang zijn' : null,
            rdy: (!rdy || rdx.length !== 5) ? 'Dit getal moet 5 tekens lang zijn' : null,
          })
        }
      >
        {({ submitForm }) =>
          (
            <form onSubmit={submitForm}>
              <div className="form-group">
                <label htmlFor="rdx">Rijksdriehoek X</label>
                <Text className="form-control" field="rdx" placeholder="43000" />
              </div>
              <div className="form-group">
                <label htmlFor="rdy">Rijksdriehoek Y</label>
                <Text className="form-control" field="rdy" placeholder="20000" />
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
};

export default NewHintForm;
