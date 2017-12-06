CSS Styling:
1. after creating project, run 'npm run eject' - creates config file
2. in config file, go to first webpack (webpack.config.dev.js) and arond line 160,
    make the following updates:
      add to CSS object (after 'importLoaders: 1')

      modules: true,
      localIdentName: '[name]__[local]__[hash:base64:5]'

      also add to second webpack (for production) around line 169 after 'sourceMap:'

      ...look for // custom addition for these lines if needed


3. remove App.css an logo.js file
4. clean up App.js file ... should look like:
    import React, { Component } from 'react';

    class App extends Component {
      render() {
        return (
          <div className="App">

          </div>
        );
      }
    }

    export default App;
