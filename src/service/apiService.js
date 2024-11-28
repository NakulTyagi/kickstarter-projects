const fetchProjects = (onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.open(
    'GET',
    'https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json',
    true
  );

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        try {
          const data = JSON.parse(xhr.responseText);
          onSuccess(data);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          onError(error);
        }
      } else {
        console.error('AJAX call failed with status:', xhr.status);
        onError(xhr.statusText);
      }
    }
  };

  xhr.onerror = () => {
    console.error('AJAX call encountered a network error');
    onError('Network error');
  };

  xhr.send();
};

export default fetchProjects;
