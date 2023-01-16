import CatImage from './ImageList'
import FinalizePassword from './FinalizePassword'

const PasswordGenerator = ({ fn }) => {


    return (
        <>
            <div align= "center"> 
                <h2>Password Generator</h2>
                <h3>Choose 5 images.</h3>
                <CatImage cat="Movies" />
                <br /><br />
                <CatImage cat="Series" />
                <br /><br />
                <CatImage cat="Sceneries" />
                <br /><br />
                <CatImage cat="Animations" />
                <br /><br />
                <CatImage cat="Fauna" />
                <br /><br />
                <FinalizePassword fn={fn} />
            </div>
        </>
    )
}

export default PasswordGenerator