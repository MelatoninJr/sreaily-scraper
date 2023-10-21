import React from "react";

interface CardProps {
  title: string;
  imageSrc: string;
  description: string;
  tags: string[];
  isNew: boolean;
}

const Card: React.FC<CardProps> = ({ title, imageSrc, description, tags, isNew }) => {
  return (
    <div 
    className="card w-96 bg-base-100 shadow-xl transform transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
    style={{
      boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px'
    }}
  >      <figure>
        <img src={imageSrc} alt={title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {title}
          {isNew && <div className="badge badge-secondary">NEW</div>}
        </h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          {tags.map((tag, index) => (
            <div key={index} className="badge badge-outline">
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default Card;
