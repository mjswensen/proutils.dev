<!-- 

  TODO: What are the different flows?
  1. Pasting a token to decode it and optionally verify it.
  2. Creating a token from scratch.
  
 -->
<script lang="ts" context="module">
  enum SecretType {
    NONE,
    HASH,
    SIGNATURE,
  }
  const ALGORITHM_DICTIONARY = new Map<string, SecretType>([
    ['none', SecretType.NONE],
    // HMAC
    ['HS256', SecretType.HASH],
    ['HS384', SecretType.HASH],
    ['HS512', SecretType.HASH],
    // RSA signature with PKCS #1 and SHA-2
    ['RS256', SecretType.SIGNATURE],
    ['RS384', SecretType.SIGNATURE],
    ['RS512', SecretType.SIGNATURE],
    // RSA PSS signature with SHA-2
    ['PS256', SecretType.SIGNATURE],
    ['PS384', SecretType.SIGNATURE],
    ['PS512', SecretType.SIGNATURE],
    // ECDSA signature with SHA-2
    ['ES256', SecretType.SIGNATURE],
    ['ES256K', SecretType.SIGNATURE],
    ['ES384', SecretType.SIGNATURE],
    ['ES512', SecretType.SIGNATURE],
    // Edwards-curve DSA
    ['EdDSA', SecretType.SIGNATURE],
  ]);

  const ALLOWED_ALGORITHMS = [...ALGORITHM_DICTIONARY.keys()];

  function getType(algorithm: string): SecretType {
    return ALGORITHM_DICTIONARY.get(algorithm) || SecretType.NONE;
  }

  // type State = {
  //   tokenText: string;
  //   tokenValidation: ValidationMessage | null;
  //   headerText: string;
  //   headerValidation: ValidationMessage | null;
  //   payloadText: string;
  //   payloadValidation: ValidationMessage | null;
  //   mode: 'validate' | 'sign';
  //   secretText: string;
  //   secretValidation: ValidationMessage | null;
  //   privateKeyText: string;
  //   privateKeyValidation: ValidationMessage | null;
  //   publicKeyText: string;
  //   publicKeyValidation: ValidationMessage | null;
  // };

  // type StateEvent =
  //   | { type: 'token_input'; text: string }
  //   | { type: 'header_input'; text: string }
  //   | { type: 'payload_input'; text: string }
  //   | { type: 'secret_input'; text: string }
  //   | { type: 'private_key_input'; text: string }
  //   | { type: 'public_key_input'; text: string };
</script>

<script lang="ts">
  import Banner from '$lib/Banner.svelte';
  import TextField, { type ValidationMessage } from '$lib/TextField.svelte';
  import { SignJWT, jwtVerify } from 'jose';

  // function reducer(event: StateEvent, state: State): State {
  //   switch (event.type) {
  //   }
  //   return state; // TODO: remove once all event types are accounted for
  // }

  // let state: State = {
  //   tokenText: '',
  //   tokenValidation: null,
  //   headerText: '',
  //   headerValidation: null,
  //   payloadText: '',
  //   payloadValidation: null,
  //   mode: 'validate',
  //   secretText: '',
  //   secretValidation: null,
  //   privateKeyText: '',
  //   privateKeyValidation: null,
  //   publicKeyText: '',
  //   publicKeyValidation: null,
  // };

  type DecodedToken = {
    header: any;
    payload: any;
    valid: boolean;
  };

  let tokenText: string = '';
  let tokenValidation: ValidationMessage | null = null;

  let headerText: string = '';
  let headerValidation: ValidationMessage | null = null;

  let payloadText: string = '';
  let payloadValidation: ValidationMessage | null = null;

  let mode: 'verify' | 'sign' = 'verify';
  let secretUi: SecretType = SecretType.NONE;

  let secretText: string = '';
  let secretValidation: ValidationMessage | null = null;

  let privateKeyText: string = '';
  let privateKeyValidation: ValidationMessage | null = null;

  let publicKeyText: string = '';
  let publicKeyValidation: ValidationMessage | null = null;

  async function encode(
    payload: string,
    header: string,
    secret: string,
  ): Promise<string> {
    // TODO: if none, b64urlencode and join on . manually.
    return await new SignJWT(JSON.parse(payload))
      .setProtectedHeader(JSON.parse(header))
      .sign(new TextEncoder().encode(secret));
  }

  async function decode(token: string, secret: string): Promise<DecodedToken> {
    try {
      const [header, payload] = token
        .split('.')
        .filter((_, i) => i < 2)
        .map((part) => atob(part))
        .map((part) => JSON.parse(part));
      try {
        await jwtVerify(token, new TextEncoder().encode(secret));
        return {
          header,
          payload,
          valid: true,
        };
      } catch {
        return { header, payload, valid: false };
      }
    } catch {
      throw new Error('Invalid token');
    }
  }

  async function onTokenInput(value: string) {
    resetValidations();
    mode = 'verify';
    tokenText = value;
    if (!tokenText) return;
    try {
      const { header, payload, valid } = await decode(tokenText, secretText);
      secretUi = getType(header.alg);
      headerText = JSON.stringify(header, null, 2);
      payloadText = JSON.stringify(payload, null, 2);
      if (valid) {
        tokenValidation = {
          type: 'success',
          text: 'Valid signature',
        };
      } else {
        tokenValidation = {
          type: 'warning',
          text: 'Invalid signature',
        };
      }
    } catch {
      headerText = '';
      payloadText = '';
      tokenValidation = {
        type: 'error',
        text: 'Invalid token',
      };
    }
  }

  async function onSourceInput() {
    resetValidations();
    mode = 'sign';
    try {
      const header = JSON.parse(headerText);
      if (!ALLOWED_ALGORITHMS.includes(header.alg)) {
        headerValidation = {
          type: 'error',
          text: `Algorithm must be one of ${ALLOWED_ALGORITHMS.map(
            (alg) => `"${alg}"`,
          ).join(', ')}`,
        };
      } else {
        secretUi = getType(header.alg);
      }
    } catch {
      headerValidation = {
        type: 'error',
        text: 'Invalid JSON',
      };
    }
    try {
      JSON.parse(payloadText);
    } catch {
      payloadValidation = {
        type: 'error',
        text: 'Invalid JSON',
      };
    }
    if (secretUi === SecretType.HASH && secretText.length === 0) {
      secretValidation = {
        type: 'error',
        text: 'Secret must not be empty',
      };
    }
    tokenText = sourceValid()
      ? await encode(payloadText, headerText, secretText)
      : '';
  }

  async function onHeaderInput(value: string) {
    headerText = value;
    await onSourceInput();
  }

  async function onPayloadInput(value: string) {
    payloadText = value;
    await onSourceInput();
  }

  async function onSecretInput(value: string) {
    secretText = value;
    await onSourceInput();
  }

  function resetValidations() {
    headerValidation = null;
    payloadValidation = null;
    secretValidation = null;
    privateKeyValidation = null;
    publicKeyValidation = null;
    tokenValidation = null;
  }

  function sourceValid() {
    return (
      headerValidation === null &&
      payloadValidation === null &&
      secretValidation === null &&
      privateKeyValidation === null &&
      publicKeyValidation === null
    );
  }
</script>

<div class="layout">
  <header>
    <h1>JWT</h1>
    <p>Decode JWTs, or create and encode your own JWTs from scratch.</p>
  </header>
  <div class="token">
    <h2>Encoded</h2>
    <TextField
      id="jwt-token"
      label="Token"
      multiline
      placeholder="Token..."
      value={tokenText}
      onInput={onTokenInput}
      validationMessage={tokenValidation}
    />
  </div>
  <div class="header">
    <h2>Decoded</h2>
    <TextField
      id="jwt-header"
      label="Header"
      multiline
      placeholder="Header..."
      value={headerText}
      onInput={onHeaderInput}
      validationMessage={headerValidation}
    />
  </div>
  <div class="payload">
    <TextField
      id="jwt-payload"
      label="Payload"
      multiline
      placeholder="Payload..."
      value={payloadText}
      onInput={onPayloadInput}
      validationMessage={payloadValidation}
    />
  </div>
  <div class="signature">
    <h2>Signature</h2>
    {#if secretUi === SecretType.HASH}
      <TextField
        id="jwt-secret"
        label="Secret"
        placeholder="Secret..."
        value={secretText}
        onInput={onSecretInput}
        validationMessage={secretValidation}
      />
    {/if}
  </div>
  <footer>
    <Banner type="success">
      Your data remains securely on your device—feel free to audit the page
      source or <a href="https://github.com/mjswensen/proutils.dev">
        inspect the code on GitHub.
      </a>
    </Banner>
  </footer>
</div>

<style>
  .layout {
    height: 100%;
    padding: var(--scale-4);
    display: grid;
    gap: var(--scale-4);
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto 1fr 1fr auto auto;
    grid-template-areas:
      'page-header page-header'
      'token header'
      'token payload'
      'signature signature'
      'page-footer page-footer';
  }
  header {
    grid-area: page-header;
  }
  .token {
    grid-area: token;
  }
  .header {
    grid-area: header;
  }
  .payload {
    grid-area: payload;
  }
  .signature {
    grid-area: signature;
  }
  footer {
    grid-area: page-footer;
  }
</style>
