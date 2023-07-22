import useFetch from "../../hooks/useFetch";
import "./featured.css";
import { Flex, Spinner, Text } from '@chakra-ui/react'

const Featured = () => {

  const {data, loading, error} = useFetch("/hotels/countByCity?cities=Kolkata,Chennai,Mumbai,Delhi")
  // console.log(data)

  return (
    <div className="featured">
      {loading ? (
        <Flex>
        <Spinner/>
        <Text>Loading pls wait!!!</Text>
        </Flex>
      ) : 
      (<><div className="featuredItem">
        <img
          src="https://www.itchotels.com/content/dam/itchotels/in/umbrella/itc/hotels/itcroyalbengal-kolkata/images/overview-landing-page/overview/desktop/exterior-dusk-with-pond.png"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Kolkata</h1>
          <h2>{data && data.length>0 && data[0]} properties</h2>
        </div>
      </div>
      
      <div className="featuredItem">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/4/4f/The_Leela_Palace_Chennai.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Chennai</h1>
          <h2>{data && data.length>0 && data[1]} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://navbharattimes.indiatimes.com/thumb/95857952/facts-about-taj-hotel-mumbai-you-probably-didnt-know-about-95857952.jpg?imgsize=175834&width=1200&height=900&resizemode=75"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Mumbai</h1>
          <h2>{data && data.length>0 && data[2]} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://media-cdn.tripadvisor.com/media/photo-s/23/b5/5f/31/facade.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Delhi</h1>
          <h2>{data && data.length>0 && data[3]} properties</h2>
        </div>
      </div>
      </>)}
    </div>
  );
};

export default Featured;
