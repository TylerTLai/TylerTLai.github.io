import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const {colors} = theme;

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat&family=Oswald:wght@400;500;600;700&display=swap'); 
    body {
        padding: 0 30px;
        font-family: 'Montserrat', sans-serif;
        background-color: ${colors.black};

        h1 {
            font-family: "Oswald", sans-serif;
        } 
    }
`;

export default GlobalStyle;
