import { relayServerEnvironment } from "./server";

const relaySSR = (resolver) => async (context) => {
    try {
        const environment = relayServerEnvironment();

        context.environment = environment;

        if (typeof resolver !== "function") {
            return { props: { relay: environment.getStore().getSource().toJSON() } };
        }

        const pageProps = await resolver(context);
        const relayProps = { props: { relay: environment.getStore().getSource().toJSON() } };

        if (pageProps?.redirect) return { redirect: pageProps.redirect };
        if (pageProps?.props) return { props: { ...pageProps.props, ...relayProps.props } };

        return relayProps;
    } catch ({ message, stack }) {
        return { props: { error: JSON.stringify({ message, stack }) } };
    }
};

export default relaySSR;
