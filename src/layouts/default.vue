<template>
    <div class="overflow-hidden h-screen w-screen absolute">
        <video autoplay muted loop id="video-background" class="min-h-full aspect-video min-w-full">
            <source src="/drone-shot-sv-de-rijp.mp4" type="video/mp4" autoplay>
            <!-- Add additional source elements for different video formats (WebM, Ogg) -->
        </video>
    </div>

    <slot />
</template>