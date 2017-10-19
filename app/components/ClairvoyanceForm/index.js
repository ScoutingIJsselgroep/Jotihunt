/**
 *
 * ClairvoyanceForm
 *
 */

import React, { PropTypes } from 'react';
import { Form, Text } from 'react-form';
const config = require('../../../config');
// import styled from 'styled-components';


class ClairvoyanceForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const defaultValues = {};
    ['ABCDB EBFCG', 'AGHHD EEBAD', 'IIAFH EDJIB', 'AJFEH EDHFG', 'AJIIH EIFFJ', 'ABHJA EEAII'].map((e, i) => {
      const subareas = config.dbMappings.nArea;
      defaultValues[subareas[i]] = e;
      return [subareas[i], e];
    });
    const myForm = (
      <Form
        onSubmit={(values) => {
          this.props.onSubmitValues(values);
        }}
        onChange={(values) => {


        }}
        defaultValues={defaultValues}
      >
        {({ submitForm }) =>
          (
            <form onSubmit={submitForm}>
              <h3>Invoer</h3>
              <div className="form-group col-xs-6">
                <span htmlFor="Alpha">Alpha</span>
                <Text className="form-control" field="Alpha" placeholder="AAAAA AAAAA" />
              </div>
              <div className="form-group col-xs-6">
                <span htmlFor="Bravo">Bravo</span>
                <Text className="form-control" field="Bravo" placeholder="BBBBB BBBBB" />
              </div>
              <div className="form-group col-xs-6">
                <span htmlFor="Charlie">Charlie</span>
                <Text className="form-control" field="Charlie" placeholder="CCCCC CCCCC" />
              </div>
              <div className="form-group col-xs-6">
                <span htmlFor="Delta">Delta</span>
                <Text className="form-control" field="Delta" placeholder="DDDDD DDDDD" />
              </div>
              <div className="form-group col-xs-6">
                <span htmlFor="Echo">Echo</span>
                <Text className="form-control" field="Echo" placeholder="EEEEE EEEEE" />
              </div>
              <div className="form-group col-xs-6">
                <span htmlFor="Foxtrot">Foxtrot</span>
                <Text className="form-control" field="Foxtrot" placeholder="FFFFF FFFFF" />
              </div>
              <button type="submit" className="btn btn-default">Versturen</button>
              {/*
              <h3>Vorige invoer</h3>
              <div className="form-group col-xs-6">
                <span htmlFor="pAlpha">Alpha</span>
                <Text className="form-control" field="pAlpha" placeholder="AAAAA AAAAA" />
              </div>
              <div className="form-group col-xs-6">
                <span htmlFor="pBravo">Bravo</span>
                <Text className="form-control" field="pBravo" placeholder="BBBBB BBBBB" />
              </div>
              <div className="form-group col-xs-6">
                <span htmlFor="pCharlie">Charlie</span>
                <Text className="form-control" field="pCharlie" placeholder="CCCCC CCCCC" />
              </div>
              <div className="form-group col-xs-6">
                <span htmlFor="pDelta">Delta</span>
                <Text className="form-control" field="pDelta" placeholder="DDDDD DDDDD" />
              </div>
              <div className="form-group col-xs-6">
                <span htmlFor="pEcho">Echo</span>
                <Text className="form-control" field="pEcho" placeholder="EEEEE EEEEE" />
              </div>
              <div className="form-group col-xs-6">
                <span htmlFor="pFoxtrot">Foxtrot</span>
                <Text className="form-control" field="pFoxtrot" placeholder="FFFFF FFFFF" />
              </div>*/}
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

ClairvoyanceForm.propTypes = {
  onSubmitValues: PropTypes.func,
};

export default ClairvoyanceForm;
