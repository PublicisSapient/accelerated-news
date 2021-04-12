import React, { Fragment } from 'react';
import { Headline } from '../../models';
import './HeadlinesView.css';

export interface HeadlinesViewProps {
  headlines: Array<Headline>;
}

export const HeadlinesView = ({ headlines }: HeadlinesViewProps) => {
  return (
    <Fragment>
      {headlines.map((headline) => (
        <div key={headline.title} data-testid="headline">
          <h4 className="headline__title">{headline.title}</h4>
          <p className="headline__attribution">{headline.attribution}</p>
          <p className="headline__teaser">{headline.teaser}</p>
        </div>
      ))}
    </Fragment>
  );
};
