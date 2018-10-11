/**
*
* SearchGroupList
*
*/

import React from 'react';
import { Form, Text } from 'react-form';

// import styled from 'styled-components';


class SearchGroupList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const myForm = (
      <Form
        onChange={(values) => {
          this.props.onSearchChange(values.values);
        }}
      >
        {({ submitForm }) =>
          (
            <form onSubmit={submitForm}>
              <div className="form-group">
                <Text className="form-control" field="search" placeholder="Zoeken" />
              </div>
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

SearchGroupList.propTypes = {

};

export default SearchGroupList;
