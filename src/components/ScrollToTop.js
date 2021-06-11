import { useEffect } from 'react'
import { useHistory } from 'react-router';

export default () => {
    const history = useHistory()
    useEffect(() => {
        window.scrollTo(0, 0);
      return () => {
        // unlisten();
      }
    }, []);
  
    return (null);
  }