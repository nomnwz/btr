<?php
/**
 * Footer
 */

?>
    
    <?php
    if ( !( btr_is_otp_active() && !btr_has_current_user_access() ) ) {
        ?>
        </div>
        <?php
    }
    ?>
<?php wp_footer(); ?>
</body>
</html>