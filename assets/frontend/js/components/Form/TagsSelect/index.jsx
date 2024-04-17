/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import classnames from 'classnames';
import AutoGrowingInput from 'frontend/js/components/Form/AutoGrowingInput';
import Tag from './Tag';
import SubmitButton from './SubmitButton';
import useStyles from './useStyles';
import Suggestions from './Suggestions';
import ClearButton from './ClearButton';

function TagsSelect({ suggestions, onSubmit }) {
  const classes = useStyles();
  const [tags, setTags] = useState([]);
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const matchingSuggestions = suggestions.filter((suggestion) => {
    const s = suggestion.toLowerCase();
    const q = query.toLowerCase();

    return !tags.includes(suggestion) && s.includes(q);
  });

  function handleQueryUpdate(q) {
    const nextQuery = q.replace(/[^0-9a-zA-Z]/gi, '');
    setQuery(nextQuery);
  }

  function handleSubmit(tagsToSubmit) {
    const nextTags = tagsToSubmit || (query ? [...tags, query] : tags);

    setQuery('');
    setTags(nextTags);
    onSubmit(nextTags);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleSubmit();
    }

    if (e.key === ' ' && query) {
      setTags([...tags, query]);
      setQuery('');
    }
  }

  function handleTagDelete(tag) {
    setTags(tags.filter((t) => t !== tag));
  }

  function handleSuggestionSelect(tag) {
    setQuery('');

    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  }

  return (
    <label htmlFor="containerId" className={classnames(classes.root, { 'is-focused': isFocused })}>
      <ScrollContainer>
        <div className={classes.grid}>
          {tags.map((tag) => (
            <Tag label={tag} onDelete={handleTagDelete} key={tag} />
          ))}

          <AutoGrowingInput
            type="text"
            id="containerId"
            name="containerId"
            autoComplete="off"
            value={query}
            rootClassName={classes.inputWrap}
            onChange={handleQueryUpdate}
            onKeyDown={handleKeyDown}
            placeholder={tags.length ? null : 'Search via Container #'}
            className={classes.input}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              if (e.relatedTarget && e.relatedTarget.classList.contains('suggestion')) {
                return;
              }
              setIsFocused(false);
            }}
          />
        </div>
      </ScrollContainer>

      {tags.length > 0 && !query && <ClearButton onClick={() => handleSubmit([])} />}

      <SubmitButton onClick={() => handleSubmit()} />

      <Suggestions
        suggestions={matchingSuggestions}
        query={query}
        onClick={handleSuggestionSelect}
        isOpen={matchingSuggestions.length > 0 && Boolean(query) && isFocused}
      />
    </label>
  );
}

export default TagsSelect;
