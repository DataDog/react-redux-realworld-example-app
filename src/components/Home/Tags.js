import React from 'react';
import agent from '../../agent';

const Tags = props => {
  const tags = props.tags;
  let filteredTags;

  // Only show appropriate tags
  if (tags) {
    filteredTags = tags.filter(tag => {
      if (tag && tagIsGood(tag)) {
        return tag
      }
    });

    return (
      <div className="tag-list">
        {
          filteredTags.map(tag => {
            const handleClick = ev => {
              ev.preventDefault();
              props.onClickTag(tag, page => agent.Articles.byTag(tag, page), agent.Articles.byTag(tag));
            };

            return (
              <a
                href=""
                className="tag-default tag-pill"
                key={tag}
                onClick={handleClick}>
                {tag}
              </a>
            );
          })
        }
      </div>
    );
  } else {
    return (
      <div>Loading Tags...</div>
    );
  }
};

const tagIsGood = (tag) => {
  const culprits = ['HITLER', 'SIDA', 'mahdi', 'butt', 'xxx', 'xxxx'];
  return !culprits.includes(tag);
};

export default Tags;
