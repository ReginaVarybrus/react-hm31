// Done

import React, { FC } from "react";

interface IHomepageInterfase {
    text: string;
    src: string
}

const HomePage: FC<IHomepageInterfase> = ({ text, src }): JSX.Element => {
    return (
        <div className="Home-page">
            <h1>{text}</h1>
            <img src={src}></img>
        </div>
    )
}

export default HomePage;