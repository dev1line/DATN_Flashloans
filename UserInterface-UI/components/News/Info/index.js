import clsx from "clsx";
import Head from "next/head";
const Info = (props) => {
  const info = props.data.property.filter(
    (i, index) => index < props.data.property.length - 1
  );
  const table = props.data.property[props.data.property.length - 1];
  return (
    <>
      <Head>
        <link key="/css/info.css" rel="stylesheet" href="/css/info.css" />
      </Head>
      <div className="container">
        {info.map((item, index) => (
          <div
            className={
              index % 2 == 0 ? clsx("s-cover") : clsx("s-cover reverse")
            }
            key={index}
          >
            <img src={item.image.original} className="img-size" />
            <div className="contenter">
              <h2>{item.key}</h2>
              <p>{item.value}</p>
            </div>
          </div>
        ))}

        <h3>{table.value}</h3>
        <div className="s-cover">
          <table className="table">
            <tbody>
              {table.content.map((i, d) => (
                <tr key={d}>
                  <th scope="row">{i.key}</th>
                  <td>{i.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Info;
