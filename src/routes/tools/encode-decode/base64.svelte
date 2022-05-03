<script lang="ts">
  let raw = '';
  let encoded = '';

  function setRaw(event) {
    const input = event.target!.value;
    raw = input;
    encoded = btoa(input);
  }

  function setEncoded(event) {
    const input = event.target.value;
    encoded = input;
    raw = atob(input);
  }
</script>

<textarea on:input={setRaw}>{raw}</textarea>
<textarea on:input={setEncoded}>{encoded}</textarea>
