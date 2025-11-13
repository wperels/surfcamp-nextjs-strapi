import Link from 'next/link';
import Image from 'next/image';


const InfoBlock = ( {data} ) => {
const {headline, text, button, reversed} = data;
  return (
  <div className={`info ${reversed ? 'info--reversed' : ''}`}>
      <img src="/info-blocks/rectangle.png" alt="" className="info__image" />
    <div className="info__text">
      <h2 className="info__headling">{headline}</h2>
      {text}
      {button}
    </div>
  </div>
)
}

export default InfoBlock