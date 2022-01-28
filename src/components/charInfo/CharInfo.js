import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";
import PropTypes from "prop-types";

import "./charInfo.scss";

const CharInfo = (props) => {
  const [char, setChar] = useState(null);

  const { loading, error, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, [props.charId]);

  const updateChar = () => {
    const { charId } = props;
    if (!charId) {
      return;
    }

    clearError();
    getCharacter(charId).then(onCharLoaded);
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const skeleton = char || loading || error ? null : <Skeleton />;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? <View char={char} /> : null;

  return (
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;
  const customizeImg =
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? (
      <img src={thumbnail} style={{ objectFit: "contain" }} alt={name} />
    ) : (
      <img src={thumbnail} alt="Random character" className="randomchar__img" />
    );
  const notComics =
    comics.length === 0 ? (
      <h3 style={{ textAlign: "center" }}>
        Doesn't find comics with this character
      </h3>
    ) : null;
  const renderItems = comics.slice(0, 10).map((item, i) => {
    return (
      <li key={i} className="char__comics-item">
        <Link to={`/comics/${item.resourceURI.substring(43)}`}>
          {item.name}
        </Link>
      </li>
    );
  });
  return (
    <>
      <div className="char__basics">
        {customizeImg}
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main" target="_blank">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary" target="_blank">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {notComics}
        {comics.slice(0, 10).map((item, i) => {
          // eslint-disable-next-line
          if (i > 9) return;
          return (
            <li key={i} className="char__comics-item">
              <Link to={`/comics/${item.resourceURI.substring(43)}`}>
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number,
};

export default CharInfo;
