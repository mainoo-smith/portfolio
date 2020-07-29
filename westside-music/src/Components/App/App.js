import React from 'react';
import './App.css';
import SearchBar from './../SearchBar/SearchBar';
import SearchResults from './../SearchResults/SearchResults';
import Playlist from './../Playlist/Playlist';
import Spotify from './../../util/Spotify';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchResults : [],
      playlistName: 'Last Show',
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  
  }
//add track
  addTrack(track){
    let tracks = this.state.playlistTracks;
      if(tracks.find(SavedTrack =>
        SavedTrack.id === track.id)) {
        return;
      }
      tracks.push(track);
      this.setState({playlistTracks : tracks});
  }
  //remove track(s)
  removeTrack(track){
    let tracks = this.state.playlistTracks.filter(SavedTrack => SavedTrack.id !== track.id);
      this.setState({playlistTracks : tracks});
  }
  //update playlist name
  updatePlaylistName(name){
    this.setState({playlistName: name});
  }
  //save playlist
  savePlaylist(){
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() =>{
      this.setState({playlistName: 'New Playlist', playlistTracks: []});
    });
  }
  //search
  search(term){
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    });
    
  }

  render(){
    return (
      <div>
        <h1>West<span className="highlight">side</span>Music</h1>
        <div className="App">
        <SearchBar onSearch={this.search}/>
        <div className="App-playlist">
         <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
        <Playlist playlist={this.state.playlistName} 
                  playlistTracks={this.state.playlistTracks}
                  onRemove={this.removeTrack}
                  onNameChange={this.updatePlaylistName}
                  onSave={this.savePlaylist}/>
        </div>
        </div>
      </div>
    )
  }
}

export default App;
