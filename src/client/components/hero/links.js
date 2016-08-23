import React from 'react';
import _ from 'lodash';
import Link from './link';

const Links = ({ hero, links }) => {
  const icon = 'TMP';
  const data = _.map(links, (link, id) =>
    <Link
      hero={ hero }
      icon={ icon }
      link={ link.url }
      name={ link.type }
      key={ id }
    />
  );
  const classname = `links-${ hero }`;

  return (
    <div className={ classname }>
      { data }
    </div>
  );
};

Links.propTypes = {
  hero: React.PropTypes.string.isRequired,
  links: React.PropTypes.array.isRequired,
};

export default Links;
