/**
*
* SearchMessageList
*
*/

import React from 'react';
import { Form, Text } from 'react-form';

class SearchMessageList extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
            <div className="form-message">
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

SearchMessageList.propTypes = {

};

export default SearchMessageList;
