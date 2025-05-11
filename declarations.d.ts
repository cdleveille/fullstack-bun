declare module "*.svg" {
	// For using as a React component (with SVGR)
	const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

	// For using as a URL/path string
	const content: string;

	export { ReactComponent };
	export default content;
}
