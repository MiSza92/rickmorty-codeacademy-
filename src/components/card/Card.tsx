import "./CardStyle.css";

import { charData } from "../../customTypes";

type cardProps = {
  children: charData;
};

function Card({ children }: cardProps) {
  return (
    <div className="card">
      <img src={children?.image} alt="Picture" />
      <div className="charBox">
        <h1>{children?.name} </h1>
        <table>
          <tbody>
            <tr>
              <td>
                <p>Species:</p>
              </td>
              <td>
                <p>{children?.species}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Gender:</p>
              </td>
              <td>
                <p>{children?.gender}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Origin:</p>
              </td>
              <td>
                <p>{children?.origin}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Current location:</p>
              </td>
              <td>
                <p>{children?.location}</p>
              </td>
            </tr>
            {/* <tr>
              <td>
                <p>In episode:</p>
              </td>
              <td>
                <p>{episoden}</p>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Card;
