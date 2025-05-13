import './Box.css';

const Box = ({fullName, title, myAnimal, age, id}) => {
  return (
    <div className="box">
      <p>Name: {fullName}</p>
      <p>Title: {title}</p>
      <p>Animal: {myAnimal}</p>
      <p>Age: {age}</p>
      <p>ID: {id}</p>
    </div>
  );
};

export default Box;