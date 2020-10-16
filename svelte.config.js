import seqPreprocessor from 'svelte-sequential-preprocessor';
import autoPreprocess from 'svelte-preprocess';

const preprocess  = seqPreprocessor([
	autoPreprocess({
		scss: {
			prependData: `@import 'src/styles/variables.scss';`
		},
		postcss: {
			plugins: [require('autoprefixer')()]
		}
	})
]);import sveltePreprocess from 'svelte-preprocess';

module.exports = {
  preprocess
};