import PropTypes from "prop-types";

const Title = ({ mainTitle, subTitle }) => {
    return (
        <div>
            <div className="text-center my-6 w-[50%] lg:w-[40%] xl:w-[20%] mx-auto">
                <h3 className="text-3xl border-y-2 py-2 uppercase">{mainTitle}</h3>
                <p className="text-md mt-2">{subTitle}</p>
            </div>
        </div>
    );
};

Title.propTypes = {
    mainTitle: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
}
export default Title;