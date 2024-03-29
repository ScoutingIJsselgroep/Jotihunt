/**
*
* NewHintForm
*
*/


import React from 'react';
import PropTypes from 'prop-types';

import { Form, Text, Select } from 'react-form';
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
