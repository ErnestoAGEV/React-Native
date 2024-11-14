import React from "react";
import { Artist } from "@/types/artist";
import { Text, View, Image, ScrollView } from "react-native";
import styled from "styled-components/native";

const MainContainer = styled(View)`
  margin: 5px;
  background-color: white;
  flex-direction: column;
  shadow-color: black;
  shadow-opacity: 0.1;
  shadow-offset: 1px -2px;
  elevation: 2;
  padding: 10px;
  border-radius: 8px;
`;

const ImageContainer = styled(Image)`
  width: 100%;
  height: 200px;
  resize-mode: cover;
  border-radius: 8px;
`;

const ArtistName = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
`;


interface ArtistDetailViewProps {
  artist: Artist;
}

const ArtistDetailView: React.FC<ArtistDetailViewProps> = ({ artist }) => {
  return (
    <ScrollView>
      <MainContainer>
        <ImageContainer source={{ uri: artist.image }} />
        <ArtistName>{artist.name}</ArtistName>
      </MainContainer>
    </ScrollView>
  );
};

export default ArtistDetailView;
