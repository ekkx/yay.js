# yay.js

### Installation

```bash
npm install yay-js
```

### Quick Example

example.js

```javascript
import { YayAPI } from 'yay-js';

const main = async () => {
  const api = new YayAPI({
    email: 'EMAIL', // Your username
    password: 'PASSWORD', // Your password
  });

  await api.create_post({
    text: 'Hello with yay.js',
  });
};

main();
```
