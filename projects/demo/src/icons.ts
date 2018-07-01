import { library } from '@fortawesome/fontawesome-svg-core';

import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';

import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons/faExternalLinkAlt';

const icons = [
  faGithub,
  faTwitter,
  faExternalLinkAlt
];

library.add(...icons);
