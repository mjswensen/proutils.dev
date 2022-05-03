<script lang="ts">
  let raw = '';
  let encoded = '';

  // TODO: try/catch and display error
  function setRaw(event) {
    const input = event.target!.value;
    raw = input;
    encoded = encodeURIComponent(input);
  }

  function setEncoded(event) {
    const input = event.target.value;
    encoded = input;
    raw = decodeURIComponent(input);
  }
</script>

<textarea on:input={setRaw}>{raw}</textarea>
<textarea on:input={setEncoded}>{encoded}</textarea>
