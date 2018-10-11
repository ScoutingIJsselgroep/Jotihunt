/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import H1 from 'components/H1';
import messages from './messages';
import {Helmet} from "react-helmet";

const image = require('./index.svg');

export default function NotFound() {
  return (
    <article className="container text-center">
      <h1> 404: Pagina niet gevonden </h1>
      <img src={image} />
    </article>
  );
  /*
  light: EA9327
  medium: E97D1F D09451
  dark: F84B26
  */
}
