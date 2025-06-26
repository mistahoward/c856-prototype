export default {
	async fetch(request: Request, env: any, ctx: any): Promise<Response> {
	  return new Response('Hello from the C856 API!');
	},
  };