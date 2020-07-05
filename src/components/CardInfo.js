import React from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import useFetch from "../hooks/useFetch";
import Rating from "@material-ui/lab/Rating";

const Container = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 50px;
  .MuiRating-readOnly {
    display: flex;
    color: rgb(33, 150, 243);
    padding-right: 10px;
    justify-content: flex-start;
    align-items: center;
  }
`;

const CardImageContainer = styled.article`
  width: 100%;
  height: 600px;
`;

const CardImage = styled.div`
  width: 100%;
  height: 100%;
  background: url(${(props) => props.img});
  background-size: cover;
  background-position: center center;
`;
const CardLinks = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 40px;
  a {
    text-decoration: none;
    color: rgb(220, 221, 222);
    padding: 10px;
    font-size: 20px;
    font-weight: 700;
  }
`;

const CardBody = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const CardBodyImg = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 25%;
  img {
    width: 100%;
    height: auto;
  }
`;

const CardBodyTxt = styled.div`
  padding-left: 10px;
  width: 50%;
  display: flex;
  flex-direction: column;
  p {
    font-size: 14px;
  }
  a {
    text-decoration: none;
    color: rgb(33, 150, 243);
  }
`;

const CardInfo = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const id = useParams().id;
  const type = useParams().type;

  const infoId = useFetch(
    `https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}`
  );
  console.log(infoId);

  return (
    <Container>
      {infoId.poster_path && (
        <>
          <CardImageContainer>
            <CardImage
              img={`https://image.tmdb.org/t/p/original${infoId.backdrop_path}`}
            />
          </CardImageContainer>
          <CardLinks>
            <Link>INFO</Link>
            <Link>{infoId.title ? "CAST" : "EPISODES"}</Link>
            <Link>{infoId.title ? "VIDEOS" : "CAST"}</Link>
            <Link>SIMILAR</Link>
          </CardLinks>
          <CardBody>
            <CardBodyImg>
              <img
                src={`https://image.tmdb.org/t/p/w342/${infoId.poster_path}`}
              />
            </CardBodyImg>
            <CardBodyTxt>
              <h2>{infoId.title || infoId.name}</h2>
              <Rating
                value={infoId.vote_average / 2}
                precision={0.5}
                readOnly
                max={5}
              />
              <p>{infoId.overview}</p>
              <p>Duration: {infoId.runtime} min.</p>
              <p>
                Genres:
                <Link> {infoId.genres.map((genre) => genre.name + " ")}</Link>
              </p>
              <p>
                Budget:
                {infoId.budget
                  ? ` $ ${infoId.budget.toLocaleString("en-UK")}`
                  : " N/A"}
              </p>
              <p>
                Revenue:
                {infoId.revenue
                  ? ` $ ${infoId.revenue.toLocaleString("en-UK")}`
                  : " N/A"}
              </p>
              <p>
                Production:
                {infoId.production_companies.map(
                  (company) => company.name + "," + " "
                )}
              </p>
            </CardBodyTxt>
          </CardBody>
        </>
      )}
    </Container>
  );
};

export default CardInfo;
