import "aframe";
import { Entity, Scene } from "aframe-react";
import React, { Component } from "react";

const Valentine = ({ image }) => {
    return (
        <Scene>
            <Entity
                geometry={{ primitive: "box" }}
                material={{ color: "red" }}
                position={{ x: 0, y: 0, z: -5 }}
                rotation={{ x: 0, y: 45, z: 45 }}
                scale={{ x: 2, y: 2, z: 2 }}
            />
            <Entity primitive="a-sky" material="color: #ccc" />
            <Marker preset="hiro">
                <Box
                    position="0 0.5 0"
                    width="0.5"
                    height="0.5"
                    depth="0.5"
                    color="red"
                ></Box>
            </Marker>
            <Entity camera></Entity>
        </Scene>
    );
};

export default Valentine;
